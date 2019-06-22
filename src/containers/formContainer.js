import {reduxForm} from 'redux-form';
import ManualEntryForm from '../components/form/form';

const FormContainer = reduxForm({
    form: "Manual_Entry",
    touchOnChange: true,
})(ManualEntryForm);

export default FormContainer