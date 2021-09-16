import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { resolve } from 'dns';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public  afAuth:  AngularFireAuth, public firestore: AngularFirestore,private router : Router) { }

  async loginintoDatabase(data) {
    return  await this.afAuth.signInWithEmailAndPassword(data.email, data.password)

}
async register(email: string, password: string) {
  return await this.afAuth.createUserWithEmailAndPassword(email, password)

}
logout() {
  this.afAuth.signOut()
  localStorage.removeItem('authenticatedByLoginToken')
  localStorage.removeItem('userData')
  this.router.navigateByUrl('/login')
}
addNewUser(data) {
  return new Promise((resolve, reject) => {
    this.firestore
      .collection('users')
      .doc(data.email)
      .set(data)
      .then(resp => {
        resp
        resolve(data)
      })
      .catch(err => {
        reject(data)
        err
      })

  })
}
getUserData(email) {

  return this.firestore
      .collection('users')
      .doc(email)
      .get()

}
addAdoptDogDetails(data,name) {
  return new Promise((resolve, reject) => {
    this.firestore
      .collection('adopt')
      .doc(name)
      .set(data)
      .then(resp => {
        resp
        resolve(data)
      })
      .catch(err => {
        reject(data)
        err
      })

  })
}
getAdoptDogsDetails(email) {

  return this.firestore
      .collection('adopt')

      .get()

}
getAdoptDogsDetailsByName(name) {

  return this.firestore
      .collection('adopt')
      .doc(name)
      .get()

}
sendAlreadyAdoptDog(data) {
  return new Promise((resolve, reject) => {
    this.firestore
      .collection('AlreadyAdopt')
      .doc(data.name)
      .set(data)
      .then(resp => {
        resp
        resolve(data)
      })
      .catch(err => {
        reject(data)
        err
      })

  })
}
getSendAlreadyAdoptDog(name) {

  return this.firestore
      .collection('AlreadyAdopt')
      .doc(name)

      .get()

}
updatesendAlreadyAdoptDog(name,data) {
  return this.firestore
  .collection('AlreadyAdopt')
  .doc(name)
  .update(data)

}

getAdoptUserList() {
 let abc  = []
  return new Promise ((resolve, reject) => {
    this.firestore
      .collection('adopt')
      .get().toPromise().then(resp => {
          resp.forEach(x=> {
            let data = {
              docId:x.id,
              doc: x.data()

            }
            abc.push(data)
        })
        resolve(abc);
      })
    })

}
getSpecificUserDogList(id) {
  return new Promise ((resolve, reject) => {
  this.firestore.collection('adopt')
  .doc(id).get().toPromise().then(resp=>{
    let data  = resp.data()
    resolve(data);
  })
})
}
}
