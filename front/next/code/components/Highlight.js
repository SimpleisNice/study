export default function Hightlight(props) {
  return (
    <>
      <span>{props.text}</span>
      <style jsx>{`
        span {
          background: yellow;
          font-weight: bold;
        }
      `}</style>
    </>
  );
}
