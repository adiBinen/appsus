import utilService from '../global/util.service.js';
import storageService from '../global/storage.service.js';

export default {
    getEmailsToDisplay,
    addEmail,
    deleteEmail,
};

const EMAILS_KEY = 'localEmails';
const LOREM_TXT = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, consequatur! Aliquid aliquam sapiente reiciendis, suscipit in, id at fugiat et esse accusamus aspernatur rem ipsum veritatis praesentium ducimus porro commodi.`;


var emailsDB;

_createEmails();

function getEmailsToDisplay() {
    return Promise.resolve(emailsDB);
}

function addEmail(data) {
    let {sender, recipient, subject, body} = data;
    emailsDB.push(_createEmail(sender, recipient, subject, body));
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
        emails = [
            _createEmail(),
            _createEmail(),
            _createEmail(),
        ];
    }
    emailsDB = emails;
}

function _createEmail(sender = "Adi", recipient = "Simon", subject = 'Hi there', body = LOREM_TXT) {
    return {
        id: utilService.generateId(),
        sender: sender,
        recipient: recipient,
        subject: subject,
        body: body,
        isRead: false,
        sentAt: Date.now(),
    }
}