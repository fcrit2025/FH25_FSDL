// Create the AngularJS module
var app = angular.module('studentRecordsApp', []);

// Create the controller
app.controller('studentController', function($scope) {
    // Initialize students array
    $scope.students = [
        { id: '100001', name: 'John Doe', email: 'john@example.com', age: 20, grade: 'A' },
        { id: '100002', name: 'Jane Smith', email: 'jane@example.com', age: 22, grade: 'B' },
        { id: '100003', name: 'Mike Johnson', email: 'mike@example.com', age: 19, grade: 'C' }
    ];
    
    // Initialize current student object
    $scope.currentStudent = {};
    $scope.isEditing = false;
    
    // Function to submit student (add or update)
    $scope.submitStudent = function() {
        if ($scope.studentForm.$valid) {
            if ($scope.isEditing) {
                // Update existing student
                for (var i = 0; i < $scope.students.length; i++) {
                    if ($scope.students[i].id === $scope.currentStudent.id) {
                        $scope.students[i] = angular.copy($scope.currentStudent);
                        break;
                    }
                }
            } else {
                // Add new student
                $scope.students.push(angular.copy($scope.currentStudent));
            }
            
            // Reset form
            $scope.resetForm();
        }
    };
    
    // Function to edit a student
    $scope.editStudent = function(student) {
        $scope.currentStudent = angular.copy(student);
        $scope.isEditing = true;
    };
    
    // Function to delete a student
    $scope.deleteStudent = function(studentId) {
        if (confirm('Are you sure you want to delete this student?')) {
            $scope.students = $scope.students.filter(function(student) {
                return student.id !== studentId;
            });
            
            // If deleting the currently edited student, reset the form
            if ($scope.isEditing && $scope.currentStudent.id === studentId) {
                $scope.resetForm();
            }
        }
    };
    
    // Function to reset the form
    $scope.resetForm = function() {
        $scope.currentStudent = {};
        $scope.isEditing = false;
        $scope.studentForm.$setPristine();
        $scope.studentForm.$setUntouched();
    };
    
    // Watch for changes in the form validity (optional)
    $scope.$watch('studentForm.$valid', function(newVal) {
        console.log('Form valid:', newVal);
    });
});