import type {ForwardedRef, FunctionComponent} from 'react';
import React, {forwardRef, useContext} from 'react';
import TextInput from '@components/TextInput';
import type {BaseTextInputRef} from '@components/TextInput/BaseTextInput/types';
import FormContext from './FormContext';
import type {BaseInputProps, InputWrapperProps} from './types';

type WrappableInputs = typeof TextInput;

function InputWrapper<TInput extends WrappableInputs, TInputProps extends BaseInputProps>(
    {InputComponent, inputID, valueType = 'string', ...rest}: InputWrapperProps<TInput, TInputProps>,
    ref: ForwardedRef<BaseTextInputRef>,
) {
    const {registerInput} = useContext(FormContext);
    // There are inputs that don't have onBlur methods, to simulate the behavior of onBlur in e.g. checkbox, we had to
    // use different methods like onPress. This introduced a problem that inputs that have the onBlur method were
    // calling some methods too early or twice, so we had to add this check to prevent that side effect.
    // For now this side effect happened only in `TextInput` components.
    const shouldSetTouchedOnBlurOnly = InputComponent === TextInput;

    // TODO: Sometimes we return too many props with register input, so we need to consider if it's better to make the returned type more general and disregard the issue, or we would like to omit the unused props somehow.
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <InputComponent {...registerInput(inputID, {ref, valueType, ...rest, shouldSetTouchedOnBlurOnly} as any)} />;
}

InputWrapper.displayName = 'InputWrapper';

export default forwardRef(InputWrapper);
