import { useState } from 'react';

function Form(props: any) {
    const [title, setTitle] = useState('');

    function handleSubmit(e: any) {
        e.preventDefault();
        if (!title.trim()) {
            return;
        }

        props.addMovie(title);
        setTitle('');
    }

    function handleChange(e: any) {
        setTitle(e.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label
                    htmlFor="new-to-watch-input"
                    className="label__lg"
                >
                    What do you want to add?
                </label>
            </h2>

            <input
                type="text"
                placeholder="Title"
                id="new-to-watch-input"
                className="input input__lg"
                name="text"
                autoComplete="off"
                value={title}
                onChange={handleChange}
            />
            <button
                type="submit"
                className="btn btn__primary btn__lg"
            >
                Add
            </button>
        </form>
    );
}

export default Form;
