import { useState } from "react";
import { ProfilesTable } from "@/components/Tables/ProfilesTables";
import { StatusCards } from "@/components/StatusCards/StatusCards";
import { AddProfileModal } from "@/components/Modals/AddProfileModal";
import { addNewProfile } from "@/store/Profile.store";
import { HomeButtonGroup } from "@/components/ButtonGroup/HomeButtonGroup";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openAddProfileModal = () => {
    setIsModalOpen(true);
  };

  const closeAddProfileModal = () => {
    setIsModalOpen(false);
  };

  const getProfile = async (url: string) => {
    closeAddProfileModal();
    addNewProfile(url);
  };

  return (
    <>
      <div className="p-8">
        <StatusCards />
        <div className="mt-5" />
        <AddProfileModal
          isOpen={isModalOpen}
          onClose={closeAddProfileModal}
          onSave={getProfile}
        />
        <HomeButtonGroup onAddProfile={openAddProfileModal} />
        <div className="mt-5" />
        <ProfilesTable />
      </div>
    </>
  );
};

export { Home };
