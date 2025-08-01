import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from 'formik';
import * as Yup from 'yup';
import css from './NoteForm.module.css';
import { useState } from 'react';

interface FormValues {
  title: string;
  content: string;
  tag: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(50, 'Title must be at most 50 characters')
    .required('Title is required'),
  content: Yup.string()
    .max(500, 'Content must be at most 500 characters')
    .required('Content is required'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

interface NoteFormProps {
  onCreate: (title: string, content: string, tag: string) => void;
  onCancel: () => void;
}

export default function NoteForm({ onCreate, onCancel }: NoteFormProps) {
  const [disabledCreateButton, setDisabledCreateButton] = useState<boolean>(true);

  const initialValues: FormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const handleSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
    onCreate(values.title, values.content, values.tag);
    resetForm();
    setDisabledCreateButton(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty }) => {
        const shouldEnableButton = isValid && dirty;

        if (shouldEnableButton !== !disabledCreateButton) {
          setDisabledCreateButton(!shouldEnableButton);
        }

        return (
          <Form className={css.form}>
            <div className={css.formGroup}>
              <label htmlFor="title">Title</label>
              <Field id="title" name="title" type="text" className={css.input} />
              <ErrorMessage name="title" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="content">Content</label>
              <Field
                as="textarea"
                id="content"
                name="content"
                rows={8}
                className={css.textarea}
              />
              <ErrorMessage name="content" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
              <label htmlFor="tag">Tag</label>
              <Field as="select" id="tag" name="tag" className={css.select}>
                <option value="Todo">Todo</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Meeting">Meeting</option>
                <option value="Shopping">Shopping</option>
              </Field>
              <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
              <button type="reset" className={css.cancelButton} onClick={onCancel}>
                Cancel
              </button>
              <button
                type="submit"
                disabled={disabledCreateButton}
                className={css.submitButton}
              >
                Create note
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
