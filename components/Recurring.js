import { Card, Input, Table, Spacer, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import * as Realm from "realm-web";


export default function Recurring() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Card css={{ mw: "400px" }}>
                <Card.Body>
                    <CardHeader />
                    <Card.Divider></Card.Divider>
                    <CardTable></CardTable>
                    {/* <Card.Divider></Card.Divider> */}
                    {/* <CardFooter></CardFooter> */}
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

    const [rows, setRows] = useState([]);
    const [expName, setExpName] = useState("")
    const [amt, setAmt] = useState(0)

    useEffect(async () => {
        const recData = await getRecData("nik")
        console.log("myval", recData[0].Recurring_Expenses)

        let rowData = recData[0].Recurring_Expenses.map((value, index) => {
            index = index + 1
            value["key"] = index
            return value
        })
        setRows(rowData)
    }, []);



    function addRecord() {
        const reqObj = {
            username: "nik",
            name: expName,
            amt: amt
        }
        addRecToMongo(reqObj)
        let newKey = rows[rows.length - 1].key + 1
        setRows([...rows, { name: expName, amt: amt, key: newKey }])
        return
    }

    return (
        <>
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
            <Input aria-label="Expense Name" size="xs" placeholder="Expense Name" onChange={(e) => { setExpName(e.target.value) }} />
            <Spacer y={0.5} />
            <Input aria-label="amt" size="xs" placeholder="Amount" onChange={(e) => { setAmt(e.target.value) }} />
            <Spacer y={0.5} />
            <Button size="xs" aria-label="Add expense" onPress={addRecord}>Add Expense</Button>
        </>
    )
}

async function getRecData(username) {
    const app = new Realm.App({ id: "budzgeter-gogly" });
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        const allRecData = await user.functions.getRecurring(username);
        console.log("all re data", allRecData)
        return allRecData
    } catch (err) {
        console.error("Failed to log in", err);
    }
}


// function CardFooter() {
//     const [expName, setExpName] = useState("")
//     const [amt, setAmt] = useState(0)

//     function addRecord() {
//         console.log("Button Clicked", expName, ":::::", amt)

//         const reqObj = {
//             username: "nik",
//             name: expName,
//             amt: amt
//         }
//         addRecToMongo(reqObj)
//         console.log(reqObj)

//         return
//     }

//     return (
//         <Card.Footer>
//             <Input aria-label="Expense Name" size="xs" placeholder="Expense Name" onChange={(e) => { setExpName(e.target.value) }} />
//             <Spacer y={0.5} />
//             <Input aria-label="amt" size="xs" placeholder="Amount" onChange={(e) => { setAmt(e.target.value) }} />
//             <Spacer y={0.5} />
//             <Button size="xs" aria-label="Add expense" onPress={addRecord}>Add Expense</Button>

//         </Card.Footer>
//     )
// }

async function addRecToMongo(reqObj) {
    const mongoUser = getMongoUser()
    const res = await (await mongoUser).functions.addRecData(reqObj)
    return
}

async function getMongoUser() {
    const app = new Realm.App({ id: "budzgeter-gogly" });
    const credentials = Realm.Credentials.anonymous();
    try {
        const mongoUser = await app.logIn(credentials);
        return mongoUser
    } catch (err) {
        console.error("Failed to log in", err);
    }
}