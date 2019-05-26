
import React from 'react';
import Popup from "../../components/Popup/Popup";

export const PopupMaker= (component)=>{
    const ret= {
        make: (content)=>{
            component.setState({
                ...component.state,
                popupContent: content? content: ''
            });
        },
        destroy: ()=>{
            component.setState({
                ...component.state,
                popupContent: ''
            });
        },
        render: ()=>{
            return component.state.popupContent? (<Popup contents={component.state.popupContent} plzClose={()=>{ret.destroy();}}/>): '';
        },
    }
    return ret;
};