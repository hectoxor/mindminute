import os

from openai import OpenAI

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import traceback
import re
# from dotenv import load_dotenv
import json
# load_dotenv()  # Load environment variables from .env

#api_key = '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'

client = OpenAI(
    # This is the default and can be omitted
    api_key="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"
)
# Load environment variables from .env file

app = Flask(
    __name__,
    static_folder=os.path.join(os.path.dirname(__file__), '..', 'frontend', 'build'),
    static_url_path='/'
)
CORS(app)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    static_folder = app.static_folder
    if path != "" and os.path.exists(os.path.join(static_folder, path)):
        return send_from_directory(static_folder, path)
    else:
        return send_from_directory(static_folder, 'index.html')





# Define the professional psychology helper prompt
PROFESSIONAL_HELPER_PROMPT = """
You are a professional psychology helper dedicated to assisting students dealing with stress. Your goal is to provide empathetic, evidence-based advice and support to help them manage and reduce their stress levels. Maintain a compassionate and non-judgmental tone throughout the conversation. Encourage students to express their feelings openly and guide them towards effective coping strategies such as mindfulness, time management, and relaxation techniques. Always prioritize the well-being and mental health of the students.
""" 


# Ensure that necessary NLTK models are downloaded

# Existing /api/generate endpoint


# Save dialogue and response in your existing /api/generate route
@app.route('/api/generate', methods=['POST'])
def generate_text():
    data = request.get_json()
    user_prompt = data.get('prompt', '')

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Correct the model
            messages=[
                {"role": "system", "content": PROFESSIONAL_HELPER_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.4,
            max_tokens=1000
        )

        helper_response = response.choices[0].message.content
        
        # Save the dialogue to the database
        
        return jsonify({
            'response': helper_response
        })
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500



    
@app.route('/api/generate_questions', methods=['POST'])
def generate_questions():
    data = request.get_json()
    study_material = data.get('text', '')

    try:
        prompt = (
            "Generate a set of self-assessment questions based on the following study material. "
            "Provide a mix of multiple-choice and short-answer questions.\n\n"
            f"{study_material}"
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an educational assistant that creates self-assessment questions for study purposes."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=1000
        )

        questions = response.choices[0].message.content.strip()

        return jsonify({
            'questions': questions
        })
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500


@app.route('/api/improve_schedule', methods=['POST'])
def improve_schedule():
    data = request.get_json()
    current_schedule = data.get('current_schedule', '')
    study_hours = data.get('study_hours', 0)
    subjects = data.get('subjects', [])
    preferred_times = data.get('preferred_times', [])
    stress_level = data.get('stress_level', '')
    stress_relief_activities = data.get('stress_relief_activities', [])
    additional_notes = data.get('additional_notes', '')

    if not current_schedule.strip():
        return jsonify({'error': 'No current schedule provided.'}), 400

    try:
        prompt = (
            "I am a student who wants to create a balanced study schedule. "
            f"Here is my current schedule:\n{current_schedule}\n\n"
            f"Study Hours per Day: {study_hours}\n"
            f"Subjects/Courses: {', '.join(subjects)}\n"
            f"Preferred Study Times: {', '.join(preferred_times)}\n"
            f"Current Stress Level: {stress_level}\n"
            f"Preferred Stress Relief Activities: {', '.join(stress_relief_activities)}\n"
            f"Additional Notes: {additional_notes}\n\n"
            "Please improve this schedule by adding approved stress relief activities such as short breaks, exercise, meditation, or leisure time. "
            "Ensure the schedule remains balanced and manageable.\n\n"
            "Provide the improved schedule in a structured JSON format as follows, without any additional text or comments:\n"
            "{\n"
            '  "schedule": [\n'
            '    {\n'
            '      "day": "Monday",\n'
            '      "tasks": [\n'
            '        {"time": "08:00 - 09:00", "activity": "Math Study"},\n'
            '        {"time": "09:00 - 10:00", "activity": "Physics Study"}\n'
            '      ]\n'
            '    }\n'
            '  ]\n'
            '}'
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Corrected model name
            messages=[
                {"role": "system", "content": "You are a helpful assistant specializing in creating balanced study schedules with stress relief activities."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5,
            max_tokens=1500
        )

        improved_schedule_text = response.choices[0].message.content.strip()

        # Attempt to parse the response as JSON
        try:
            # Remove any code block syntax if present
            if improved_schedule_text.startswith("```json"):
                improved_schedule_text = improved_schedule_text.replace("```json", "").replace("```", "").strip()

            improved_schedule = json.loads(improved_schedule_text)
            return jsonify({
                'improved_schedule': improved_schedule
            })
        except json.JSONDecodeError:
            # If parsing fails, return the raw text with a warning
            return jsonify({
                'improved_schedule': improved_schedule_text,
                'warning': 'Failed to parse improved schedule as JSON. Returning raw text.'
            })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': 'Failed to improve schedule.'}), 500

@app.route('/api/generate_flashcards', methods=['POST'])
def generate_flashcards():
    data = request.get_json()
    study_material = data.get('text', '')

    if not study_material.strip():
        return jsonify({'error': 'No study material provided.'}), 400

    try:
        prompt = (
            "Create a set of flashcards based on the following study material. "
            "Each flashcard should have a question on one side and the answer on the other side.\n\n"
            "Format each flashcard as follows:\n"
            "Q: [Your Question Here]\n"
            "A: [Your Answer Here]\n\n"
            f"{study_material}"
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Corrected model name
            messages=[
                {"role": "system", "content": "You are an educational assistant that creates flashcards for study purposes."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.3,
            max_tokens=1000
        )

        flashcards_text = response.choices[0].message.content.strip()

        # Parse the flashcards into a structured format
        flashcards = []
        for fc_item in flashcards_text.split('\n\n'):
            lines = fc_item.strip().split('\n')
            if len(lines) >= 2:
                # Use re.sub to remove prefixes
                question = re.sub(r'^Q:\s*', '', lines[0]).strip()
                answer = re.sub(r'^A:\s*', '', lines[1]).strip()
                flashcards.append({'question': question, 'answer': answer})
            else:
                # Handle malformed flashcards
                flashcards.append({'question': 'N/A', 'answer': 'N/A'})

        return jsonify({'flashcards': flashcards})

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({'error': 'Failed to generate flashcards.'}), 500





if __name__ == '__main__':
    app.run()


