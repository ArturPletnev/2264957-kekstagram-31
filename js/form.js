import { isEscapeKey } from './util';
import { body } from './open-picture';
import { setUserFormSubmit } from './validate';
import {onSmallerBtnclick, onBiggerBtnBtnclick, onFilterChange} from './edit-photo.js';

const uploadForm = document.querySelector('.img-upload__form');

const upLoadFileControl = uploadForm.querySelector('#upload-file');
const photoEditorForm = uploadForm.querySelector('.img-upload__overlay');
const photoEditorResetBtn = photoEditorForm.querySelector('#upload-cancel');

const hashtagInput = uploadForm.querySelector('.text__hashtags');
const commentInput = uploadForm.querySelector('.text__description');

const smallerBtn = uploadForm.querySelector('.scale__control--smaller');
const biggerBtn = uploadForm.querySelector('.scale__control--bigger');
const filters = photoEditorForm.querySelectorAll('[name="effect"]');


const onPhotoEditorResetBtnClick = () => closePhotoEditor();

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefolt();
    if(document.activeElement === hashtagInput || document.activeElement === commentInput) {
      evt.stopPropagation();
    } else {
      uploadForm.reset();
      closePhotoEditor();
    }
  }
};

function closePhotoEditor () {
  photoEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadForm.removeEventListener('submit', setUserFormSubmit);
  filters.forEach((filter) => {
    filter.removeEventListener('change', onFilterChange);
  });
  document.removeEventListener('keydown', onDocumentKeydown);
  photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
  smallerBtn.removeEventListener('click', onSmallerBtnclick);
  biggerBtn.removeEventListener('click', onBiggerBtnBtnclick);
  upLoadFileControl.value = '';
}

export const loadImage = () => {
  upLoadFileControl.addEventListener('change', () => {
    photoEditorForm.classList.remove('hidden');
    body.classList.add('modal-open');
    setUserFormSubmit(closePhotoEditor);
    filters.forEach((filter) => {
      filter.addEventListener('change', onFilterChange);
    });
    photoEditorResetBtn.addEventListener('click', onPhotoEditorResetBtnClick);
    smallerBtn.addEventListener('click', onSmallerBtnclick);
    biggerBtn.addEventListener('click', onBiggerBtnBtnclick);
  });
};
