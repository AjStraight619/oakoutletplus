export default function TestPage() {
  return <FlexboxTest />;
}

function FlexboxTest() {
  return (
    <div className="flex space-x-4">
      <div className="flex-1 bg-blue-500 text-white p-4">Flex 1</div>
      <div className="flex-grow bg-green-500 text-white p-4">Flex Grow</div>
      <div className="flex-shrink-0 bg-red-500 text-white p-4">
        Flex Shrink 0
      </div>
    </div>
  );
}
