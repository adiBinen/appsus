import utilService from '../../../services/util.service.js';
import storageService from '../../../services/storage.service.js';

export default {
    query,
    getEmailById,
    getUnreadEmails,
    addEmail,
    saveEmailToDraft,
    deleteEmail,
    modifyEmail,
    modifyChecked
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
    else return Promise.reject('Error: Email was not found.');
}

function getUnreadEmails() {
    return Promise.resolve(emailsDB.filter(email => !email.isRead && !email.isDeleted && !email.isDraft && !email.isSent).length);
}

function addEmail(data) {
    if (data.id) {
        return sendDraftEmail(data);
    }
    let {sender, recipient, subject, body} = data;
    emailsDB.unshift(_createEmail(sender, recipient, subject, body));
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve(`E-Mail was successfully sent to ${recipient}.`);
}

function sendDraftEmail(data) {
    let idx = _getEmailIdxById(data.id);
    if (idx === -1) return Promise.reject('Error: Email was not found, draft email required');
    emailsDB.splice(idx, 1);
    let {sender, recipient, subject, body} = data;
    let newEmail = _createEmail(sender, recipient, subject, body);
    newEmail.isSent = true;
    emailsDB.unshift(newEmail);
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve(`Email was successfully sent to ${recipient}.`);
}

function saveEmailToDraft(draftData) {
    let {sender, recipient, subject, body} = draftData;
    let newEmail = _createEmail(sender, recipient, subject, body);
    newEmail.isDraft = true;
    newEmail.isRead = true;
    emailsDB.unshift(newEmail);
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve(`Draft was saved.`);
}

function deleteEmail(id) {
    let idx = _getEmailIdxById(id);
    if (idx === -1) return Promise.reject('Failed to delete e-mail.')
    emailsDB.splice(idx, 1);
    storageService.saveToLocal(EMAILS_KEY, emailsDB);
    return Promise.resolve('E-Mail was successfully deleted.');
}

function modifyEmail(modifiedEmail) {    
    let idx = _getEmailIdxById(modifiedEmail.id);
    if (idx !== -1) {
        emailsDB.splice(idx, 1, modifiedEmail);
        storageService.saveToLocal(EMAILS_KEY, emailsDB);
        return Promise.resolve('Email was successfully modified.');
    }
    return Promise.reject('Error: Email not found');
}

function modifyChecked(action) {
    if (!action) Promise.reject('Error: no action has been selected.');
    if (action === 'delete') {
        let emailsToDelete = [];
        emailsDB.forEach(email => {
            if (email.isChecked) {
                if (email.isDeleted) {
                    emailsToDelete.push(email);
                } else {
                    email.isChecked = false;
                    email.isSent = false;
                    email.isDraft = false;
                    email.isDeleted = true;
                }
            }
        });
        if (emailsToDelete.length) {
            emailsToDelete.forEach(email => deleteEmail(email.id));
        }
    } else {
        emailsDB.forEach(email => {
            if (action === 'unread' && email.isChecked) {
                email.isRead = false;
            } else if (action === 'read' && email.isChecked) {
                email.isRead = true;
            }
            email.isChecked = false;
        });
        storageService.saveToLocal(EMAILS_KEY, emailsDB);
    }
    return Promise.resolve('Email was successfully modified.');
}

function _getEmailIdxById(id) {
    return emailsDB.findIndex(email => email.id === id);
}

function _createEmails() {
    let emails = storageService.loadFromLocal(EMAILS_KEY);
    if (!emails) {
        // DUMMY DATA SECTION
        emails = _premadeData();
    }
    emailsDB = emails;
}

function _createEmail(sender = "Adi B.", recipient = "Simon I.", subject = 'Deep in the night, I am looking for some fun!', body = LOREM_TXT) {
    return {
        id: utilService.generateId(),
        sender: sender,
        recipient: recipient,
        subject: subject,
        body: body,
        isRead: false,
        isChecked: false,
        isDeleted: false,
        isDraft: false,
        isSent: false,
        sentAt: Date.now() - 1000 * 60 * 60 * 24 * 500,
    }
}

function _premadeData() {
    let emails = [];
        for (let i = 0; i < 40; i++) {
            emails.unshift(_createEmail());
        }
        emails[1].isDeleted = true;
        emails[4].isDraft = true;
        emails[4].isRead = true;
        emails[3].isSent = true;
        emails[5].isSent = true;
        emails[0].isRead = true;
        emails[0].sentAt = Date.now();
        emails[0].sender = 'Simon I.'
        emails[3].isRead = true;
        emails[3].sender = 'Simon I.'
        emails[6].isRead = true;
        emails[6].sender = 'Adi B.'
        emails[7].sentAt = Date.now() - 1000 * 60 * 60 * 24;
        emails[7].sender = 'Adi B.'
        emails[8].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 3;
        emails[8].sender = 'Simon I.'
        emails[9].sentAt = Date.now() - 1000 * 60 * 60 * 24 * 365 * 5;
        emails[9].sender = 'Simon I.'
        storageService.saveToLocal(EMAILS_KEY, emails);
        return emails;
}