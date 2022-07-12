export function TitleContainer(props) {
    return (
        <div style={{width: "fit-content"}}>
            <h3 style={{textAlign: 'center', width: "100%"}}>{props.title}</h3>
            {props.children}
        </div>
    )
}