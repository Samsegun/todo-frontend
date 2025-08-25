import PageHeader from "@/components/customUi/PageHeader";
import PageWrapper from "@/components/customUi/PageWrapper";
import QuickStats from "@/components/customUi/QuickStats";
import UpdateUserForm from "@/components/customUi/UpdateUserForm";

function Dashboard() {
    return (
        <PageWrapper>
            <PageHeader>My dashboard</PageHeader>

            <div className='space-y-8'>
                <UpdateUserForm />

                <QuickStats />
            </div>
        </PageWrapper>
    );
}

export default Dashboard;
