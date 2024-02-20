import ListItem from "./ListItem";

function List() {
    return (
        <ul className="flex items-center justify-center sm:justify-start md:justify-center gap-5 flex-wrap">
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
            <ListItem/>
        </ul>
    );
}

export default List;