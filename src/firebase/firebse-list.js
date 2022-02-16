import { useThemeWithoutDefault } from '@mui/system';
import { firebaseDb } from './firebase';

export class FirebaseList {
  constructor(action, modelClass, path = null) {
    this._actions = action;
    this._modelClass = modelClass;
    this._path = path;
  }
  get path() {
    return this._path;
  }
  set path(value) {
    this._path = value;
  }
  push(value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(this._path).push(value, error => error ? reject(error) : resolve());
    });
  }
  remove(key) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`).remove(error => error ? reject(error) : resolve());
    });
  }
  set(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`).set(value, error => error ? reject(error) : resolve());
    });
  }
  update(key, value) {
    return new Promise((resolve, reject) => {
      firebaseDb.ref(`${this._path}/${key}`).update(value, error => error ? reject(error) : resolve());
    });
  }
  subscribe(emit) {
    let ref = firebaseDb.ref(this._path);
    let initialized = false;
    let list = [];
    ref.once('value', (value) => {
      initialized = true;
      emit(this._actions.onload(list));
    });
    ref.on('childAdded', child => {
      if (initialized) {
        emit(this._actions.onAdd(this.unwrapSnapshot(child)));
      }
      else {
        list.push(this.unwrapSnapshot(child));
      }
    });
    ref.on('chilChange', child => {
      emit(this._actions.onChange(this.unwrapSnapshot(child)));
    });
    ref.on('childRemoved', child => {
      emit(this._actions.onRemove(this.unwrapSnapshot(child)));
    });
    this._unsubscribe = () => ref.off();
  }
  unsubscribe() {
    this._unsubscribe();
  }
  unwrapSnapshot(snapshot) {
    let attrs = snapshot.val();
    attrs.key = snapshot.key;
    return new this._modelClass(attrs);
  }
}