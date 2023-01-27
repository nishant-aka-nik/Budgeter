import { Text } from "@nextui-org/react";


export default function Header() {
  const title = "BUDZGTER"
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
      <Text
        h1
        size={60}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        {title}
      </Text>
    </ div>
  )
}
