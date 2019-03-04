let cmd = botcmd.create({
    name: "тест",
    description: "Быстрая проверка работы бота",
    handler: (data, user) => {
        return "Ваш баланс: " + user.getMoney()
    }});
