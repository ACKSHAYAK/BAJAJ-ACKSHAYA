from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['GET', 'POST'])
def bfhl():
    if request.method == 'GET':
        return jsonify({"operation_code": 1}), 200

    if request.method == 'POST':
        data = request.json.get('data', [])
        user_id = "john_doe_17091999"
        email = "john@xyz.com"
        roll_number = "ABCD123"
        
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        
        highest_alphabet = max(alphabets, key=lambda x: x.lower()) if alphabets else []
        
        response = {
            "is_success": True,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_alphabet": [highest_alphabet] if highest_alphabet else []
        }
        return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
