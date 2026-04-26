// =====================================================
// OpenTDB API Integration (Trivia & General Knowledge)
// Benchmark: Open Trivia DB (OpenTDB), Khan Academy
// Focus: Science, Animals, Geography, appropriate for kids
// =====================================================

export interface TriviaQuestion {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface EducationalQuestion {
    id: string;
    question: string;
    options: string[];
    correctAnswer: string;
    topic: string;
}

// Categories suitable for kids:
// 17: Science & Nature
// 22: Geography
// 27: Animals
// 23: History
const KID_CATEGORIES = [17, 22, 27, 23];

export async function fetchTriviaQuestions(amount: number = 5): Promise<EducationalQuestion[]> {
    try {
        const category = KID_CATEGORIES[Math.floor(Math.random() * KID_CATEGORIES.length)];
        // Always fetch "easy" or "medium" for kids
        const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=easy&type=multiple`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('API Error');

        const data = await res.json();
        return data.results.map((q: TriviaQuestion) => {
            // Decode HTML entities (dumb simple decoder)
            const decode = (str: string) => str.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');

            const options = [...q.incorrect_answers.map(decode), decode(q.correct_answer)];
            // Shuffle options safely
            options.sort(() => Math.random() - 0.5);

            return {
                id: `trivia-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                question: decode(q.question), // English question
                options,
                correctAnswer: decode(q.correct_answer),
                topic: q.category,
            };
        });
    } catch (err) {
        console.error('Failed to fetch trivia:', err);
        return [];
    }
}
