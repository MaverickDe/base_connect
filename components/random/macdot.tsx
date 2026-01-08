export const Macdoc = ({
  box1 = { color: "red" },
  box2 = { color: "blue" },
  box3 = { color: "green" }
}: any) => {
  let size = 10;
  return (
    <div className="flex gap-3 items-center">
      {[{ size, ...box1 }, { size, ...box2 }, { size, ...box3 }].map((e, index) => (
        <div
          key={index}
          style={{
            backgroundColor: e.color,
            width: `${e.size}px`,
            height: `${e.size}px`,
          }}
          className="rounded-full"
        />
      ))}
    </div>
  );
};
