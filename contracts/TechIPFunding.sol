// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title TechIPFunding
/// @notice Milestone-based fundraising platform for tech IP projects on Avalanche
/// @dev Deployed on Avalanche Fuji Testnet for Avalanche Build Games MVP
contract TechIPFunding {

    // -------------------------
    // Data Structures
    // -------------------------

    struct Project {
        uint256 id;
        string name;
        address payable founder;
        uint256 goalAmount;        // Total funding goal (in wei)
        uint256 milestoneAmount;   // Amount to release upon milestone completion
        uint256 amountRaised;      // Total invested so far
        bool milestoneDone;        // Has founder marked milestone complete?
        bool fundsReleased;        // Have escrowed funds been released?
        bool exists;
    }

    // -------------------------
    // State Variables
    // -------------------------

    uint256 public projectCount;
    mapping(uint256 => Project) public projects;

    // -------------------------
    // Events
    // -------------------------

    event ProjectCreated(
        uint256 indexed projectId,
        string name,
        address indexed founder,
        uint256 goalAmount,
        uint256 milestoneAmount
    );

    event Invested(
        uint256 indexed projectId,
        address indexed investor,
        uint256 amount,
        uint256 totalRaised
    );

    event MilestoneDone(
        uint256 indexed projectId,
        address indexed founder,
        uint256 timestamp
    );

    event FundsReleased(
        uint256 indexed projectId,
        address indexed founder,
        uint256 amount
    );

    // -------------------------
    // Modifiers
    // -------------------------

    modifier projectExists(uint256 projectId) {
        require(projects[projectId].exists, "Project does not exist");
        _;
    }

    modifier onlyFounder(uint256 projectId) {
        require(msg.sender == projects[projectId].founder, "Only the project founder can call this");
        _;
    }

    // -------------------------
    // Functions
    // -------------------------

    /// @notice Create a new fundraising project
    /// @param name Project name
    /// @param goalAmount Total funding target in wei
    /// @param milestoneAmount Amount to release when milestone is marked done
    function createProject(
        string calldata name,
        uint256 goalAmount,
        uint256 milestoneAmount
    ) external {
        require(bytes(name).length > 0, "Project name cannot be empty");
        require(goalAmount > 0, "Goal amount must be greater than zero");
        require(milestoneAmount > 0, "Milestone amount must be greater than zero");
        require(milestoneAmount <= goalAmount, "Milestone amount cannot exceed goal");

        projectCount++;
        uint256 newId = projectCount;

        projects[newId] = Project({
            id: newId,
            name: name,
            founder: payable(msg.sender),
            goalAmount: goalAmount,
            milestoneAmount: milestoneAmount,
            amountRaised: 0,
            milestoneDone: false,
            fundsReleased: false,
            exists: true
        });

        emit ProjectCreated(newId, name, msg.sender, goalAmount, milestoneAmount);
    }

    /// @notice Invest AVAX into a project
    /// @param projectId The ID of the project to invest in
    function invest(uint256 projectId) external payable projectExists(projectId) {
        require(msg.value > 0, "Must send AVAX to invest");
        require(!projects[projectId].fundsReleased, "This project has already closed funding");

        projects[projectId].amountRaised += msg.value;

        emit Invested(projectId, msg.sender, msg.value, projects[projectId].amountRaised);
    }

    /// @notice Mark the milestone as completed (only callable by project founder)
    /// @param projectId The ID of the project
    function markMilestoneDone(uint256 projectId)
        external
        projectExists(projectId)
        onlyFounder(projectId)
    {
        require(!projects[projectId].milestoneDone, "Milestone already marked as done");

        projects[projectId].milestoneDone = true;

        emit MilestoneDone(projectId, msg.sender, block.timestamp);
    }

    /// @notice Release escrowed funds to the founder after milestone is completed
    /// @param projectId The ID of the project
    function releaseFunds(uint256 projectId) external projectExists(projectId) {
        Project storage project = projects[projectId];

        require(project.milestoneDone, "Milestone has not been marked as done yet");
        require(!project.fundsReleased, "Funds have already been released");
        require(project.amountRaised >= project.milestoneAmount, "Insufficient funds raised for milestone release");

        project.fundsReleased = true;

        uint256 releaseAmount = project.milestoneAmount;
        project.founder.transfer(releaseAmount);

        emit FundsReleased(projectId, project.founder, releaseAmount);
    }

    // -------------------------
    // View Functions
    // -------------------------

    /// @notice Get full details of a project
    function getProject(uint256 projectId)
        external
        view
        projectExists(projectId)
        returns (
            uint256 id,
            string memory name,
            address founder,
            uint256 goalAmount,
            uint256 milestoneAmount,
            uint256 amountRaised,
            bool milestoneDone,
            bool fundsReleased
        )
    {
        Project storage p = projects[projectId];
        return (
            p.id,
            p.name,
            p.founder,
            p.goalAmount,
            p.milestoneAmount,
            p.amountRaised,
            p.milestoneDone,
            p.fundsReleased
        );
    }

    /// @notice Get total number of projects created
    function getTotalProjects() external view returns (uint256) {
        return projectCount;
    }
}
