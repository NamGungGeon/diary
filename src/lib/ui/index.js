import React from 'react';
import {Toaster} from "./Toaster";
import {Exception} from "./Exception";
import {Loader} from "./Loader";
import {PopupMaker} from "./PopupMaker";


export const UiBundle= (component)=>{
    const bundle= {
        toaster: Toaster(component),
        exception: Exception(component),
        loading: Loader(component),
        popup: PopupMaker(component),
    };
    bundle.render= ()=>{
        return (<div>
            {bundle.toaster.toasts()}
            {bundle.exception.render()}
            {bundle.loading.render()}
            {bundle.popup.render()}

        </div>);
    };

    return bundle;
};


