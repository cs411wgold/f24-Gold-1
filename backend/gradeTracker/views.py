from django.http import JsonResponse
from django.views import View
from assignments.models import Assignment
from grades.models import Grade

class CourseAssignmentsView(View):
    def get(self, request):
        try:
            # Hardcoded course ID from utility.py
            COURSE_ID = 161613
            COURSE_NAME = "CS 411W"
            
            # Get assignments for CS 411W directly
            assignments = Assignment.objects.filter(course_id=COURSE_ID)
            print(f"Found {assignments.count()} assignments for CS 411W") # Debug log
            
            assignments_data = []
            for assignment in assignments:
                try:
                    grade = Grade.objects.get(assignment=assignment)
                    assignments_data.append({
                        'id': assignment.id,
                        'name': assignment.name,
                        'grade': grade.grade
                    })
                except Grade.DoesNotExist:
                    assignments_data.append({
                        'id': assignment.id,
                        'name': assignment.name,
                        'grade': None
                    })

            # Create single course data object
            course_data = {
                'id': COURSE_ID,
                'name': COURSE_NAME,
                'assignments': assignments_data
            }

            return JsonResponse({'courses': [course_data]})
        except Exception as e:
            print(f"Error in CourseAssignmentsView: {str(e)}") # Debug log
            return JsonResponse({'error': str(e)}, status=500)
