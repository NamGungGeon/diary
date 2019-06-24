
import React from 'react';
import Popup from "../../components/Popup/Popup";
import {getRndStr} from "../commons";

export const PopupMaker= (component)=>{
    const prefix= getRndStr();
    const ret= {
        make: (content)=>{
            component.setState({
                ...component.state,
                ['popupContent'+ prefix]: content? content: ''
            });
        },
        destroy: ()=>{
            component.setState({
                ...component.state,
                ['popupContent'+ prefix]: ''
            });
        },
        render: ()=>{
            return component.state['popupContent'+ prefix]? (<Popup contents={component.state['popupContent'+ prefix]} plzClose={()=>{ret.destroy();}}/>): '';
        },
    }
    return ret;
};