function FilterButton(props: any) {
    return (
        <button
            type="button"
            className="btn toggle-btn"
            aria-pressed={props.isPressed}
            onClick={() => props.setFilter(props.title)}
        >
            <span className="visually-hidden">Show </span>
            <span>{props.title}</span>
            <span className="visually-hidden"> movies</span>
        </button>
    );
}

export default FilterButton;
