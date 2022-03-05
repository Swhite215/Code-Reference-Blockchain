pragma solidity >=0.4.0 <0.9.0;

contract Scorecard {
    address public classTeacher;
    uint256 studentCount = 0;

    struct StudentDetails {
        string studentFirstName;
        string studentLastName;
        uint256 id;
    }

    struct Score {
        uint256 studentId;
        uint256 englishMarks;
        uint256 mathMarks;
        uint256 scienceMarks;
    }

    mapping(uint => StudentDetails) students;
    mapping(uint => Score) scores;

    event studentAdded(string _studentFirstName, string _studentLastName, uint256 _studentId);
    event studentScoreRecorded(uint256 _studentId, uint256 _englishMarks, uint256 _mathMarks, uint256 _scienceMarks);

    constructor() {
        classTeacher = msg.sender;
    }

    modifier onlyClassTeacher(address _classTeacher) {
        require(classTeacher == _classTeacher, "Only the class teacher has access to this function.");
        _;
    }

    function addStudentDetails(string memory _studentFirstName, string memory _studentLastName) public onlyClassTeacher(msg.sender) {

        StudentDetails storage studentObj = students[studentCount];
        studentObj.studentFirstName = _studentFirstName;
        studentObj.studentLastName = _studentLastName;
        studentObj.id = studentCount;

        emit studentAdded(_studentFirstName, _studentLastName, studentCount);

        studentCount++;
    }

    function adddStudentScores(uint256 _studentId, uint256 _englishMarks, uint256 _mathMarks, uint256 _scienceMarks) public onlyClassTeacher(msg.sender) {

        Score storage studentScore = scores[_studentId];
        studentScore.englishMarks = _englishMarks;
        studentScore.mathMarks = _mathMarks;
        studentScore.scienceMarks = _scienceMarks;
        studentScore.studentId = _studentId;

        emit studentScoreRecorded(_studentId, _englishMarks, _mathMarks, _scienceMarks);
    }
}