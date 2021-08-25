import React from "react";
// import styled from "styled-components";
import Icon from "@material-ui/core/Icon";
// import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";
import {Button, TextareaAutosize} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {connect} from "react-redux";

// const Container = styled.div`
//   width: 284px;
//   margin-bottom: 8px;
// `;
//
// const StyledCard = styled(Card)`
//   min-height: 85px;
//   padding: 6px 8px 2px;
// `;
//
// const StyledTextArea = styled(Textarea)`
//   resize: none;
//   width: 100%;
//   overflow: hidden;
//   outline: none;
//   border: none;
// `;
//
// const ButtonContainer = styled.div`
//   margin-top: 8px;
//   display: flex;
//   align-items: center;
//   margin-left: 8px;
// `;
//
// const StyledIcon = styled(Icon)`
//   margin-left: 8px;
//   cursor: pointer;
// `;

const InterfaceForm = ({list, text = '', onChange, closeForm, children}) => {
    const itemPlaceholder = list ? "Enter list title..." : "Enter a title for this card...";

    const handleFocus = e => {
        e.target.select();
    };

    return (
        <div className={'form-container'}>
            <Card className={'text-area-container'}>
                <TextareaAutosize
                    className={'interface-text-field'}
                    placeholder={itemPlaceholder}
                    autoFocus
                    onFocus={handleFocus}
                    value={text}
                    onBlur={closeForm}
                    onChange={(event) => onChange(event.target.value)}
                />
            </Card>
            <div className={'interface-button-add-ui'}>
                {children}
                <CloseIcon onMouseDown={closeForm}/>
            </div>
        </div>
    );
}

export default connect()(InterfaceForm);
