import utilService from '../../../services/util.service.js';
import storageService from '../../../services/storage.service.js';

export default {
    query,
    getEmailById,
    getUnreadEmails,
    addEmail,
    deleteEmail,
};

const EMAILS_KEY = 'localEmails';
const LOREM_TXT = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, consequatur! Aliquid aliquam sapiente reiciendis, suscipit in, id at fugiat et esse accusamus aspernatur rem ipsum veritatis praesentium ducimus porro commodi.`;


var emailsDB;

_createEmails();

function query() {
    return Promise.resolve(emailsDB);
}

function getEmailById(id) {
    let email = emailsDB.find(email => email.id === id);
    if (email) return Promise.resolve(email);
    else return Promise.reject('Error: Email not found');
}

function getUnreadEmails() {
    return Promise.resolve(emailsDB.filter(email => !email.isRead).length);
}

function addEmail(data) {
    let {sender, recipient, subject, body} = data;
    emailsDB.unshift(_createEmail(sender, recipient, subject, body));
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve(`E-Mail was successfully sent to ${recipient}.`);
}

function deleteEmail(id) {
    let idx = emailsDB.findIndex(email => email.id === id);
    if (idx === -1) return Promise.reject('Failed to delete e-mail.')
    emailsDB.splice(idx, 1);
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve('E-Mail was successfully deleted.');
}

function _createEmails() {
    let emails = storageService.loadFromLocal(EMAILS_KEY);
    if (!emails) {
        emails = [];
        for (let i = 0; i < 50; i++) {
            emails.unshift(_createEmail());
        }
        emails[0].isRead = true;
        emails[3].isRead = true;
        emails[6].isRead = true;
        storageService.saveToLocal(EMAILS_KEY, emails);
    }
    emailsDB = emails;
}

function _createEmail(sender = "Adi", recipient = "Simon", subject = 'Hi there, whats app? bla bla bla', body = LOREM_TXT) {
    return {
        id: utilService.generateId(),
        sender: sender,
        recipient: recipient,
        subject: subject,
        body: body,
        isRead: false,
        sentAt: Date.now() - 1000 * 60 * 60 * 24 * 500,
    }
}