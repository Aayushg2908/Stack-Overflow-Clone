import Image from "next/image";
import Link from "next/link";

interface ProfileLinkProps {
  imgUrl: string;
  href?: string;
  title: string;
}

export const ProfileLink = ({ imgUrl, title, href }: ProfileLinkProps) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <Image src={imgUrl} alt="icon" width={20} height={20} />
      {href ? (
        <Link href={href} target="_blank" className="font-medium text-blue-500">
          {title}
        </Link>
      ) : (
        <p className="font-medium">{title}</p>
      )}
    </div>
  );
};
