import useCurrentUser from "@/hooks/UseCurrentUser";
import useLoginModal from "@/hooks/UseLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}
const PostItem: React.FC<PostItemProps> = ({ userId, data }) => {
  const router = useRouter();

  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(() => {
    router.push(`/posts/${data.id}`);
  }, [router, data.id]);

  const onLike = useCallback(
    (event: any) => {
      event.stopPropagation();

      loginModal.onOpen();
    },
    [loginModal]
  );

  const createAt = useMemo(() => {
    if (!data?.createAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createAt));
  }, [data?.createAt]);
  return (
    <div
      onClick={goToPost}
      className="
            border-b-[1px]
            border-neutral-800
            p-5
            cursor-pointer
            hover:bg-neutral-900
            transition
        "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-white font-semibold cursor-pointer hover:underline">
              {data.user.name}
            </p>
            <span className=" text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>
            <span className=" text-neutral-500 cursor-pointer hover:underline hidden md:block">
              .
            </span>
            <span className="text-neutral-500 text-sm">{createAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20}/>
                <p>
                    {data.comments?.lenght || 0}
                </p>
            </div>
            <div onClick={onLike} className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <AiOutlineHeart size={20}/>
                <p>
                    {data.like?.lenght || 0}
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
