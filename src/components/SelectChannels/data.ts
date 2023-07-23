export interface ChannelType {
    name: string,
    code: string
}

export const channels: ChannelType[] = [
    {name: 'Вконтакте', code: 'vk'},
    {name: 'Телеграмм', code: 'tg'},
    {name: 'WhatsApp', code: 'wa'},
    {name: 'SMS', code: 'sms'}
]