const cvars = require('../core/cvars');
const { VK } = require('vk-io');

const vk_io = new VK();
vk_io.token = "";
vk_io.options.pollingGroupId = 0;

vk_io.setOptions({
	token: '',
	pollingGroupId: 1
});

cvars.create({
    tag: "vk_token",
    description: "access_token VK API",
    value: vk_io.token,
    callback: value => vk_io.token = value
})

cvars.create({
    tag: "vk_groupid",
    description: "ИД группы с ботом",
    value: vk_io.options.pollingGroupId,
    callback: value => vk_io.options.pollingGroupId = Number(value)
})

exports.vk_io = vk_io
exports.api = vk_io.api
