import React, { useCallback, useState } from 'react';
import { Autocomplete } from '@mui/material';

export const ControlledAutocomplete = React.forwardRef((props, ref) => {
    const [inputValue, setInputValue] = useState('')

    // const { icon, name, to, children } = props;

    // const renderAutocomplete = React.useMemo(
    //     () =>
    //       React.forwardRef(function Link(itemProps, ref,) {
    //         return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
    //       }),
    //     [to],
    //   );

    const handlerOnInputValue = useCallback(
        (event, data) => {
            if (data) {
                setInputValue(data)
            } else {
                setInputValue('')
            }
        },
        [setInputValue],
    )

    return (
        <Autocomplete
            {...props}
            ref={ref}
            renderInput={(params) => props.renderInput(params)}
            inputValue={inputValue}
            onInputChange={handlerOnInputValue}
        />
    )
}
)