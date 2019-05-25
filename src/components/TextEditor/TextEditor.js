import React, {Component} from 'react';
import './TextEditor.css';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


class TextEditor extends Component {
    static defaultProps= {
        text: '',
        observer: (text)=>{},
    }

    render() {;
        const {text, observer}= this.props
        return (
            <div>

                <CKEditor
                    editor={ ClassicEditor }
                    data={text}
                    config={{

                    }}
                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        observer(data);
                    } }
                    onBlur={ editor => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ editor => {
                        console.log( 'Focus.', editor );
                    } }
                />

            </div>
        );
    }
}

export default TextEditor;