import urllib.request
import json
import random
import os

OPENTDB_API_URL = "https://opentdb.com/api.php?amount=20&category=17&difficulty=easy&type=multiple"
OUT_FILE = "../data/seed-expanded.ts"


def fetch_science_trivia():
    print("Fetching science trivia from OpenTDB...")
    try:
        req = urllib.request.Request(OPENTDB_API_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
        if data.get("response_code") == 0:
            return data.get("results")
        return []
    except Exception as e:
        print(f"Error fetching data: {e}")
        return []

def generate_math_problems(count=20):
    print("Generating procedural elementary math problems...")
    problems = []
    
    # Simple addition
    for _ in range(count // 4):
        a, b = random.randint(1, 20), random.randint(1, 20)
        options = [a+b, a+b+random.randint(1,5), a+b-random.randint(1,5), a+b+10]
        random.shuffle(options)
        problems.append({
            "category": "Math",
            "type": "addition",
            "question": f"Có {a} quả táo, thêm {b} quả táo. Có tất cả bao nhiêu quả táo?",
            "correct_answer": str(a+b),
            "incorrect_answers": [str(x) for x in list(set(options) - {a+b})[:3]]
        })

    # Simple subtraction
    for _ in range(count // 4):
        a, b = random.randint(10, 30), random.randint(1, 9)
        options = [a-b, a-b+random.randint(1,5), a-b-random.randint(1,5), a-b+10]
        random.shuffle(options)
        problems.append({
            "category": "Math",
            "type": "subtraction",
            "question": f"Một bầy chim có {a} con, bay đi {b} con. Còn lại bao nhiêu con?",
            "correct_answer": str(a-b),
            "incorrect_answers": [str(x) for x in list(set(options) - {a-b})[:3]]
        })
        
    return problems

def produce_seed_ts(trivia, math_data):
    ts_content = "/**\n * Expanded Harvested Educational Data for Henry Learning OS\n * Age: Under 13\n * Sources: OpenTDB (Science), Procedural Math Engine\n */\n\n"
    
    ts_content += "export const HARVESTED_SCIENCE_TRIVIA = [\n"
    for item in trivia:
        q = item["question"].replace('"', '\\"')
        correct = item["correct_answer"].replace('"', '\\"')
        incorrect = [ans.replace('"', '\\"') for ans in item["incorrect_answers"]]
        
        ts_content += "  {\n"
        ts_content += f'    question: "{q}",\n'
        ts_content += f'    correctAnswer: "{correct}",\n'
        ts_content += f'    incorrectAnswers: {json.dumps(incorrect)},\n'
        ts_content += f'    category: "{item["category"]}",\n'
        ts_content += "  },\n"
    ts_content += "];\n\n"

    ts_content += "export const HARVESTED_MATH_PROBLEMS = [\n"
    for item in math_data:
        q = item["question"].replace('"', '\\"')
        correct = item["correct_answer"].replace('"', '\\"')
        incorrect = [ans.replace('"', '\\"') for ans in item["incorrect_answers"]]
        
        ts_content += "  {\n"
        ts_content += f'    type: "{item["type"]}",\n'
        ts_content += f'    question: "{q}",\n'
        ts_content += f'    correctAnswer: "{correct}",\n'
        ts_content += f'    incorrectAnswers: {json.dumps(incorrect)},\n'
        ts_content += "  },\n"
    ts_content += "];\n"
    
    return ts_content


if __name__ == "__main__":
    os.makedirs(os.path.dirname(OUT_FILE), exist_ok=True)
    trivia = fetch_science_trivia()
    math_data = generate_math_problems(20)
    
    ts_content = produce_seed_ts(trivia, math_data)
    with open(OUT_FILE, "w", encoding="utf-8") as f:
        f.write(ts_content)
    
    print(f"Successfully generated {len(trivia)} science questions and {len(math_data)} math problems in {OUT_FILE}.")

