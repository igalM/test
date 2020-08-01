import React from 'react';
import styles from './Input.module.scss';

const Input = props => {
    let inputElement = null;

    const classes = [styles.Input];
    if (props.valid && props.shouldValidate && props.touched) {
        classes.push(styles.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={classes.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={classes.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = <select
                className={classes.join(' ')}
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
            break;
        default:
        case ('input'):
            inputElement = <input
                className={classes.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    )

}

export default Input;