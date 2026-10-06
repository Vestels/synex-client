type UserSectionTitleProps = {
  title: string;
};

export default function UserSectionTitle({ title }: UserSectionTitleProps) {
  return (
    <div>
      <h2 className="section-title">{title}</h2>
      <hr className="divider" />
    </div>
  );
}
