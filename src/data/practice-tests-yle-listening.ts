import type { PracticeTest } from './practice-test-bank';

export const STARTERS_LISTENING: PracticeTest = {
  id: 'st_list_1', level: 'starters', skill: 'listening',
  skillVi: 'Starters — Nghe (Full 4 Parts)', totalMinutes: 20,
  parts: [
    { partNumber: 1, titleEn: 'Listen and draw lines', titleVi: 'Phần 1: Nghe và nối tên',
      instructionVi: 'Nghe đoạn hội thoại và chọn người phù hợp với mô tả.',
      questions: [
        {id:'sl_1_1',partNumber:1,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'Who is Tom?',audioTranscript:'Look at the boy under the tree. He is reading a book. That is Tom.',options:['A. The boy swimming','B. The boy reading under the tree','C. The boy eating an apple'],answer:'B. The boy reading under the tree',explanationVi:'Tom đang đọc sách dưới gốc cây (reading under the tree).',strategyVi:'Nghe kỹ hành động (reading) và vị trí (under the tree).'}
      ]
    },
    { partNumber: 2, titleEn: 'Read the question, listen and write a name or number', titleVi: 'Phần 2: Viết tên hoặc số',
      instructionVi: 'Nghe và gõ một TÊN hoặc SỐ vào ô trống.',
      questions: [
        {id:'sl_2_1',partNumber:2,taskTypeVi:'Điền từ',taskTypeEn:'Gap fill',prompt:'What is the name of May\'s dog?',audioTranscript:'Man: Is that your dog, May? What is its name?\nMay: Yes, his name is Hugo. H-U-G-O.',options:[],answer:'Hugo',explanationVi:'Tên chó là Hugo (H-U-G-O).',strategyVi:'Tên riêng luôn được đánh vần. Ghi lại từng chữ cái.'}
      ]
    },
    { partNumber: 3, titleEn: 'Listen and tick the box', titleVi: 'Phần 3: Chọn hình đúng',
      instructionVi: 'Nghe và chọn bức tranh đúng (A, B hoặc C).',
      questions: [
        {id:'sl_3_1',partNumber:3,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ Pictures',prompt:'What is Lucy doing?',audioTranscript:'Boy: Where is Lucy? Is she playing the piano?\nGirl: No, she is in the garden. She is kicking a ball.',options:['A. Playing piano','B. Sleeping','C. Kicking a ball'],answer:'C. Kicking a ball',explanationVi:'Lucy đang đá bóng trong vườn (kicking a ball).',strategyVi:'Người nói thường đoán sai lúc đầu (playing piano). Nghe lời khẳng định sau chữ "No".'}
      ]
    },
    { partNumber: 4, titleEn: 'Listen and colour', titleVi: 'Phần 4: Nghe và tô màu',
      instructionVi: 'Nghe kĩ và chọn đúng màu được yêu cầu.',
      questions: [
        {id:'sl_4_1',partNumber:4,taskTypeVi:'Nghe & Chọn',taskTypeEn:'MCQ',prompt:'Which star should you colour blue?',audioTranscript:'Man: Can you see the star on the robot\'s head? Colour that star blue.',options:['A. Star on the robot\'s head','B. Star in the sky','C. Star on the box'],answer:'A. Star on the robot\'s head',explanationVi:'Tô màu xanh cho ngôi sao trên đầu robot (on the robot\'s head).',strategyVi:'Nghe kỹ vị trí (on the head) và màu sắc (blue).'}
      ]
    }
  ]
};
