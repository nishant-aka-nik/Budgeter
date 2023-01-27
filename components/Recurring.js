import { Card, Table } from "@nextui-org/react";

export default function Recurring() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Card css={{ mw: "400px" }}>
                <Card.Body>
                    <CardHeader />
                    <Card.Divider></Card.Divider>
                    <CardTable></CardTable>
                </Card.Body>
            </Card>
        </ div>
    );
}

function CardHeader() {
    return (
        <Card.Header>
            <text>RECURRING EXPENSES</text>
        </Card.Header>
    )
}

function CardTable() {

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "amt",
            label: "AMOUNT",
        },
    ];
    const rows = [
        {
            key: "1",
            name: "Tony Reichert",
            amt: 100,
        }
    ];


    console.log("This is my x ---", getRows())


    return (
        <Table
            aria-label="Example table with dynamic content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={rows}>
                {(item) => (
                    <Table.Row key={item.key}>
                        {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

async function getRows() {
    let res = await fetch('./data/data.json')
    let json = await res.json();
    console.log("my json data",json)
    return json
}
