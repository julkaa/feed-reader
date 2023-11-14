import React, {ChangeEvent, FormEvent} from "react";
import styles from "./FormBlock.module.css";
import Button from "./Button/Button";
import Input from "../UI/Input";

interface IFormBlockProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChangeFirst: {
        name: string;
        label: string;
        value: string;
        onClick: (event: ChangeEvent<HTMLInputElement>) => void;
    };
    onChangeSecond: {
        name: string;
        label: string;
        value: string;
        onClick: (event: ChangeEvent<HTMLInputElement>) => void;
    };
    title: string;
    className?: string;
}

const FormBlock: React.FC<IFormBlockProps> = ({
                                                  onSubmit,
                                                  onChangeFirst,
                                                  onChangeSecond,
                                                  title,
                                                  className = ""
                                              }) => {
    const classes = `${styles.form} ${className}`;

    return (
        <div className={classes}>
            <p>{title}</p>
            <form onSubmit={onSubmit}>
                <Input
                    type="text"
                    id={onChangeFirst.name}
                    label={onChangeFirst.label}
                    placeholder={onChangeFirst.name}
                    value={onChangeFirst.value}
                    onChange={onChangeFirst.onClick}
                />
                <Input
                    type="text"
                    id={onChangeSecond.name}
                    label={onChangeSecond.label}
                    placeholder={onChangeSecond.name}
                    value={onChangeSecond.value}
                    onChange={onChangeSecond.onClick}
                />
                <Button className={styles["form-btn"]} type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default FormBlock;
