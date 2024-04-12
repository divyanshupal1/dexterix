import admin from 'firebase-admin';

const fireconfig = {
    "type": "service_account",
    "project_id": "helpinghands-eed5f",
    "private_key_id": "c6a88709496841b46a0c7af5e0c8615f3617de12",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCqACin9RePSDxH\nxsVuyfMXHkdnZe1IPW4cFOwFw8Jprs85TKCUx8zoBbJdTHKu/0TeFgTF3qa7Hb6v\n7ApmxH6JGam+cq9CvIo2JOJ/MLNXWfnJcWOcD/sWOyAiMPhYLGUBwiMNgpBnYmXA\nCIokwQL9ZbPxJlH2odeF0KXPfAInegOekrl6Qx5FWsjDY7TtxJ2TD48jpz2l5OOS\n1dDgVCaE5rG0pO7zPRf4A7imwRdAqmq3IK1zpf2E11iHyI20BB/jHf3KVnzDLDXv\nOw+ucpISuSUMcCGGPCUAEnVRrmx1PbNizzGqIG+ozVb8A/WBMyFDpAHqyCRVpjNh\nz+lXoDtRAgMBAAECggEAIorit/IEpgALA5ifgFn3k4B7CMb8tluJFpqntKooxDmZ\ncK6hyGlquNCDhBKnEOjckPXPZXdO0KGEIBHpsSUHAwucYo7CDuDpgoPvI+H85uho\n6WYpU8opfkRoTJo/tAbdRUSxw6p+dgtX2nPBwiMX3O4/6GWdbOxIsy+IqYasl2GO\nN0B0KXj5UzMrEAh62Ss7rQnotyUyOVelLiOVZfkCOeIHSliKDoXvxBvQEQs4ilC0\nL/h016TSHCXIUYF/els1GkVUhPXTqLygcc1L39K2E5HDT6faHKVZFLK4Az0OFt1N\n92lphsA4jEZCKnwZJTj3Fe5zDA5mTCGKBos6QcXYwwKBgQDSzu0tV8DABByBnJRE\nz983RwnesHyRREH8mGe386vietOscKe6SFiBipLs9JmcsGWjvyBE6+0+3jlikL/w\n4KQG54oyVc7s8vbdK0iEOobshwCc7iekUjLa9UpKhSCDqqXHYo8rJiIg32oitHEe\nqbYKftQMjNUXbceCTtGPXt8rdwKBgQDOcbkl8KONnEof6TcFRmjgmy0wtBuker7p\nXb9H3ni4Z+wbeNcCTHuPUsF8d0FQh2u5vTYEz9uLnuGfC+e16BOMHgdMVrc08tXd\nrH08Hx7fJVrL5SBTDdkZZ2Ej6HAWEOr5VqV0MlB3b70lZ6nWrBP+WKpgHBGhIka/\n6eqBl8jxdwKBgQCJDrITZddSwBmMhzG632+f79bR6urCQ5+nS6s7ZPiewf63QXM7\nYOfyKRdHaewpfGJIqO2hAcb4teCXXcb9JABg4M7v1Ow5D+pCd26pUagBRfC3Fvu9\nERgxVYMcmhs+n4cy77hndF6CAt9teuWE6xAJGNZi5nlwxxYMeZQz45mzFwKBgQDF\nCpaFN+FjUEEPpDD3v/RqLLI9QisAGogNhYUEu7rNh6M7tWLCtu1YJsy2V7znd9nC\nNm5QuXP7F3KRs3M9lHzTx/V/T2UeDIlEQ1ZlA+8bXTQEWHU50IXeUWXOOBSDezJL\nOgBBn6Rd2zDVetQIKcYLheVYRnItMeIFWuaROqZ4kQKBgQCBj3N2OGGdQxva1mdJ\nuywu4sooQjGXRpQdvsJpOX0wMhZSIrsVJb0RzEJR505CXdTgweSZXV+Zj5xgnOH7\njP8ejlHJYvW0ArwtBEi50HWLvf1QsbTs2W5Us+XmjhOZWnzrh17GeYoaZVH2ZnCe\nNnv6nvaT+yPYTEaNx7HWH+r9aw==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-y028t@helpinghands-eed5f.iam.gserviceaccount.com",
    "client_id": "115519428351925807958",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-y028t%40helpinghands-eed5f.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

try {
    admin.initializeApp({
        credential: admin.credential.cert(fireconfig),
    })
    console.log('Initialized.')
} catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        console.error('Firebase admin initialization error', error.stack)
    }
}

export default admin