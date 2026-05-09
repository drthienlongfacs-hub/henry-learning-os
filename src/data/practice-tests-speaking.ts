import type { PracticeTest } from './practice-test-bank';

export const STARTERS_SPEAKING: PracticeTest = {
  id: 'st_sp_1', level: 'starters', skill: 'listening', // Use 'listening' temporarily for UI grouping, or update interface
  skillVi: 'Starters — Nói (Speaking)', totalMinutes: 5,
  parts: [
    { partNumber: 1, titleEn: 'Find the object', titleVi: 'Phần 1: Chỉ đồ vật',
      instructionVi: 'Nhìn bức tranh lớn. Giám khảo sẽ hỏi bạn chỉ vào các đồ vật.',
      questions: [
        {id:'ss_1_1',partNumber:1,taskTypeVi:'Nói',taskTypeEn:'Speaking',prompt:'Examiner: "Where is the monkey?"\n(Nhìn tranh và chỉ vào con khỉ, sau đó nói vị trí của nó)',options:['(Bấm xem gợi ý trả lời)'],answer:'(Bấm xem gợi ý trả lời)',explanationVi:'Gợi ý: "Here it is. It is in the tree." (Nó đây ạ. Nó ở trên cây).',strategyVi:'Phần này chỉ cần chỉ tay, nhưng nếu nói thêm được vị trí thì sẽ ghi điểm tuyệt đối.'}
      ]
    },
    { partNumber: 2, titleEn: 'Answer questions about yourself', titleVi: 'Phần 2: Câu hỏi cá nhân',
      instructionVi: 'Giám khảo hỏi về bản thân bạn. Trả lời to và rõ ràng.',
      questions: [
        {id:'ss_2_1',partNumber:2,taskTypeVi:'Nói',taskTypeEn:'Speaking',prompt:'Examiner: "What is your favourite sport?"',audioTranscript:'What is your favourite sport?',options:['(Bấm xem gợi ý trả lời)'],answer:'(Bấm xem gợi ý trả lời)',explanationVi:'Gợi ý: "My favourite sport is football." / "I like playing tennis."',strategyVi:'Trả lời cả câu đầy đủ thay vì chỉ nói 1 từ (football).'}
      ]
    }
  ]
};

export const KET_SPEAKING: PracticeTest = {
  id: 'ket_sp_1', level: 'ket', skill: 'listening',
  skillVi: 'KET — Nói (Full 2 Parts)', totalMinutes: 10,
  parts: [
    { partNumber: 1, titleEn: 'Interview', titleVi: 'Phần 1: Phỏng vấn cá nhân',
      instructionVi: 'Giám khảo sẽ hỏi bạn các câu hỏi về cuộc sống hàng ngày.',
      questions: [
        {id:'ks_1_1',partNumber:1,taskTypeVi:'Nói',taskTypeEn:'Speaking',prompt:'Examiner: "Tell me something about your weekends."\n(Kể về ngày cuối tuần của bạn)',audioTranscript:'Tell me something about your weekends.',options:['(Bấm xem gợi ý trả lời)'],answer:'(Bấm xem gợi ý trả lời)',explanationVi:'Gợi ý: "On Saturdays, I usually meet my friends in the park. On Sundays, I stay at home and do my homework. Sometimes, I watch a movie with my family."',strategyVi:'Với câu hỏi "Tell me something about...", phải nói ít nhất 2-3 câu, đưa ra chi tiết.'}
      ]
    },
    { partNumber: 2, titleEn: 'Collaborative Task', titleVi: 'Phần 2: Thảo luận theo chủ đề',
      instructionVi: 'Bạn và một thí sinh khác sẽ nhìn vào một số hình ảnh và thảo luận với nhau.',
      questions: [
        {id:'ks_2_1',partNumber:2,taskTypeVi:'Nói',taskTypeEn:'Speaking',prompt:'Examiner: "Here are some pictures showing different hobbies. Do you like these different hobbies? Say why or why not."\n(Nhìn vào các hình: đọc sách, chơi game, đá bóng. Thảo luận.)',audioTranscript:'Here are some pictures showing different hobbies. Do you like these different hobbies? Say why or why not.',options:['(Bấm xem gợi ý trả lời)'],answer:'(Bấm xem gợi ý trả lời)',explanationVi:'Gợi ý: "I really like reading books because it is relaxing. I don\'t like playing football because it is too tiring. What do you think?"',strategyVi:'Phần 2 yêu cầu TƯƠNG TÁC. Nhớ hỏi lại bạn cùng thi: "What about you?" hoặc "Do you agree?"'}
      ]
    }
  ]
};

export const PET_SPEAKING: PracticeTest = {
  id: 'pet_sp_1', level: 'pet', skill: 'listening',
  skillVi: 'PET — Nói (Full 4 Parts)', totalMinutes: 12,
  parts: [
    { partNumber: 2, titleEn: 'Describe a photograph', titleVi: 'Phần 2: Miêu tả bức tranh',
      instructionVi: 'Bạn có 1 phút để miêu tả một bức tranh màu.',
      questions: [
        {id:'ps_2_1',partNumber:2,taskTypeVi:'Nói',taskTypeEn:'Speaking',prompt:'Examiner: "I\'d like you to describe a photograph showing people learning. You have one minute."\n(Nhìn tranh: Một lớp học, học sinh đang nhìn vào máy tính, giáo viên đứng cạnh).',audioTranscript:'I\'d like you to describe a photograph showing people learning. You have one minute.',options:['(Bấm xem gợi ý trả lời)'],answer:'(Bấm xem gợi ý trả lời)',explanationVi:'Gợi ý: "In this picture, I can see a classroom. In the middle, there are two students looking at a laptop. The boy is pointing at the screen. On the right, the teacher is standing and explaining something. They all look very focused. In the background, there is a whiteboard."',strategyVi:'Chiến lược miêu tả tranh: 1. Overview (Nhìn chung). 2. Details (Chi tiết ai/cái gì đang làm gì). 3. Background/Foreground. 4. Guessing (Họ có vẻ như thế nào).'}
      ]
    }
  ]
};
