import { notFound } from 'next/navigation';
import { createAdminClient } from '@/lib/supabase/admin';
import RoomDetails from '@/app/components/RoomDetails/RoomDetails';


export default async function RoomDetailPage({ params }) {
    const { slug } = await params;
    const supabase = createAdminClient();

    const { data: room, error } = await supabase
        .from('room_types')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

    if (error || !room) {
        notFound();
    }

    const { data: units } = await supabase
        .from('rooms')
        .select('id')
        .eq('room_type_id', room.id)
        .eq('is_active', true);

    return <RoomDetails room={room} totalUnits={units?.length ?? 0} />;
}