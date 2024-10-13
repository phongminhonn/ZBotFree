module.exports = {
    config: {
        name: "Echo",
        version: "1.0",
        credits: "Quýt",
        description: "",
        tag: "bot",
        usage: "",
        countDown: 1000,
        role: 3,
    },
    

   
    run: (api, args) => {
        // Logic có thể thêm ở đây nếu cần
    },

    anyEvent: async (api, event) => {
        // Kiểm tra xem sự kiện là một tin nhắn
        if (event.type === 1 && !event.isSelf) {
            const content = event.data.content?.trim(); // Lấy nội dung tin nhắn

            // Kiểm tra xem nội dung có phải là chuỗi không
            if (typeof content === 'string') {
                // Gửi lại nội dung tin nhắn
                api.sendMessage({
                    body: content, // Nội dung tin nhắn nhại lại
                    quote: event.data.msgId // Trích dẫn ID của tin nhắn gốc
                }, event.threadId).catch(console.error);
            }
        }
    },

    onLoad: (api) => {
        // Logic khởi tạo nếu cần
        console.log("Echo bot đã sẵn sàng!");
    },
};