

const Cover = ({img, title}) => {
    return (
        <div
  className="hero h-[600px]"
  style={{
    backgroundImage:
      `url("${img}")`,
  }}
>
  <div className="hero-overlay"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
       <h1 className="text-4xl font-apparcase pt-32 text-center font-bold">{title}</h1>
    </div>
  </div>
</div>
    );
};

export default Cover;