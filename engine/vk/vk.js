const cvars = require('../core/cvars');
const { VK } = require('vk-io');

const vk_io = new VK();
vk_io.token = "";
vk_io.pollingGroupId = 0;

let vk_token = cvars.create("vk_token", "access_token VK API", vk_io.token).setCallback((value) => vk_io.token = value)
let vk_groupid = cvars.create("vk_groupid", "ИД группы с ботом", vk_io.pollingGroupId).setCallback((value) => vk_io.pollingGroupId = value)

exports.vk_io = vk_io
exports.api = vk_io.api
