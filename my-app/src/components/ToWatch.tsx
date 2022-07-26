import { useEffect, useRef, useState } from 'react';
import { usePrevious } from './usePrevious';

function ToWatch(props: any) {
    const [isEditing, setEditing] = useState(false);

    const [newTitle, setNewTitle] = useState('');

    const editFieldRef: any = useRef(null);
    const editButtonRef: any = useRef(null);

    const wasEditing = usePrevious(isEditing);

    function handleChange(e: any) {
        setNewTitle(e.target.value);
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        if (!newTitle.trim()) {
            return;
        }

        props.editMovie(props.id, newTitle);
        setNewTitle('');
        setEditing(false);
    }

    const editingTemplate = (
        <form
            className="stack-small"
            onSubmit={handleSubmit}
        >
            <div className="form-group">
                <label
                    className="to-watch-label"
                    htmlFor={props.id}
                >
                    Renaming {props.title}
                </label>
                <input
                    id={props.id}
                    className="to-watch-text"
                    type="text"
                    value={newTitle || props.title}
                    onChange={handleChange}
                    ref={editFieldRef}
                />
            </div>
            <div className="btn-group">

                <button
                    type="button"
                    className="btn to-watch-cancel"
                    onClick={() => setEditing(false)}
                >
                    Cancel
                    <span className="visually-hidden">renaming {props.title}</span>
                </button>
                <button
                    type="submit"
                    className="btn btn__primary to-watch-edit"
                >
                    Save
                    <span className="visually-hidden">renaming {props.title}</span>
                </button>
            </div>
        </form>
    );

    const viewTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.watched}
                    onChange={() => props.toggleMovieWatched(props.id)}
                />
                <label
                    className="to-watch-label"
                    htmlFor={props.id}
                >
                    {props.title}
                </label>
            </div>
            <div className="btn-group">
                <button
                    type="button"
                    className="btn"
                    onClick={() => setEditing(true)}
                    ref={editButtonRef}
                >
                    Edit <span className="visually-hidden">{props.title}</span>
                </button>
                <button
                    type="button"
                    className="btn btn__danger"
                    onClick={() => props.removeMovie(props.id)}
                >
                    Delete <span className="visually-hidden">{props.title}</span>
                </button>
            </div>
        </div>
    );


    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);


    return <li className="to-watch">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default ToWatch;
