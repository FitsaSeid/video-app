import React from "react";
import { View, FlatList, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appWrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import InfoBox from "../../components/InfoBox";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();

  const { data: posts, refetch } = useAppWrite(() => getUserPosts(user?.$id));

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.push("/sign-in");
  };

  console.log(posts);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item?.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.users.username}
            avatar={item.users.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={handleLogout}
              className="w-full items-end mb-10"
            >
              <Image
                className="w-6 h-6 "
                resizeMode="contain"
                source={icons.logout}
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg items-center justify-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg "
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyle="mt-5"
              titleStyles="text-lg"
            />

            <View className="w-1/3 mt-5 flex-row justify-between">
              <InfoBox
                title={posts.length || 0}
                subTitle="Posts"
                containerStyle="mr-10"
                titleStyles="text-xl "
              />
              <InfoBox
                title="2.4k"
                subTitle="Followers"
                containerStyle="mt-5 "
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Video Found"
            subTitle="No videos found for this search query"
          />
        )}
      />
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Profile;
