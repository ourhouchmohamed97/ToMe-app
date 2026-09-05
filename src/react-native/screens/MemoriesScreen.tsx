import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { COLORS, SPACING, RADIUS } from '../styles/theme';
import { ToMeIcon } from '../components/ToMeIcon';
import { MemoryItem } from '../../types';

interface MemoriesScreenProps {
  memories: MemoryItem[];
  onOpenMemoryDetail: (memory: MemoryItem) => void;
  onOpenPhotoLightbox?: (url: string, caption?: string) => void;
}

export const MemoriesScreen: React.FC<MemoriesScreenProps> = ({
  memories,
  onOpenMemoryDetail,
  onOpenPhotoLightbox,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'photo' | 'voice' | 'thought'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const filterPills = [
    { id: 'all', label: 'All', count: 47 },
    { id: 'photo', label: 'Photos', count: 12 },
    { id: 'voice', label: 'Voice notes', count: 8 },
    { id: 'thought', label: 'Milestones', count: 3 },
  ];

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredMemories = memories.filter((m) => {
    if (activeFilter !== 'all' && m.type !== activeFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      m.title.toLowerCase().includes(q) ||
      m.quote?.toLowerCase().includes(q) ||
      m.tag?.toLowerCase().includes(q)
    );
  });

  const sepMemories = filteredMemories.filter((m) => m.monthYear === 'September 2026');
  const augMemories = filteredMemories.filter((m) => m.monthYear === 'August 2026');

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <ToMeIcon name="search" size={18} color={COLORS.outline} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search words, feelings, dates…"
            placeholderTextColor={COLORS.outline}
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.searchTuneBtn}>
            <ToMeIcon name="tune" size={18} color={COLORS.onSurfaceVariant} />
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScroll}
        >
          {filterPills.map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <React.Fragment key={pill.id}>
                <TouchableOpacity
                  onPress={() => setActiveFilter(pill.id as any)}
                  style={[styles.filterPill, isActive && styles.filterPillActive]}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                    {pill.label} ({pill.count})
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </ScrollView>

        {/* Timeline Content */}
        <View style={styles.timelineContainer}>
          {/* September 2026 Section */}
          {sepMemories.length > 0 && (
            <View style={styles.monthSection}>
              <View style={styles.monthHeaderRow}>
                <Text style={styles.monthTitle}>September 2026</Text>
                <View style={styles.monthCountBadge}>
                  <Text style={styles.monthCountText}>{sepMemories.length} entries</Text>
                </View>
              </View>

              {sepMemories.map((mem) => (
                <React.Fragment key={mem.id}>
                  <View style={styles.memoryCard}>
                    {/* Tag & Date */}
                    <View style={styles.cardMetaRow}>
                      <Text style={styles.metaTag}>{mem.tag || 'MEMORY'}</Text>
                      <Text style={styles.metaDate}>{mem.dateLabel}</Text>
                    </View>

                    {/* Photo Memory */}
                    {mem.type === 'photo' && mem.photoUrl && (
                      <View style={styles.photoBlock}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() => onOpenPhotoLightbox?.(mem.photoUrl!, mem.quote)}
                          style={styles.photoContainer}
                        >
                          <Image source={{ uri: mem.photoUrl }} style={styles.memoryPhoto} />
                          <View style={styles.analogBadge}>
                            <Text style={styles.analogBadgeText}>ANALOG FRAME</Text>
                          </View>
                        </TouchableOpacity>

                        {mem.quote && (
                          <Text style={styles.photoQuoteText}>{mem.quote}</Text>
                        )}

                        <TouchableOpacity
                          onPress={() => onOpenMemoryDetail(mem)}
                          style={styles.viewConversationLink}
                        >
                          <Text style={styles.linkText}>View full conversation →</Text>
                        </TouchableOpacity>
                      </View>
                    )}

                    {/* Voice Note Memory */}
                    {mem.type === 'voice' && (
                      <View style={styles.voiceBlock}>
                        <View style={styles.voiceHeaderRow}>
                          <TouchableOpacity
                            onPress={() =>
                              setPlayingId(playingId === mem.id ? null : mem.id)
                            }
                            style={styles.voicePlayBtn}
                          >
                            <ToMeIcon
                              name={playingId === mem.id ? 'pause' : 'play_arrow'}
                              size={18}
                              color={COLORS.onPrimary}
                            />
                          </TouchableOpacity>

                          <View style={styles.voiceWaveformContainer}>
                            <View style={styles.waveformBars}>
                              {[2, 4, 6, 3, 5, 4, 2, 6, 4, 5, 3, 2, 4, 6, 3].map((h, i) => (
                                <React.Fragment key={i}>
                                  <View
                                    style={[
                                      styles.waveformBar,
                                      { height: h * 3 },
                                      playingId === mem.id && i < 8 && styles.barActive,
                                    ]}
                                  />
                                </React.Fragment>
                              ))}
                            </View>
                            <Text style={styles.audioDurationText}>
                              {playingId === mem.id ? '0:14 / 0:48' : mem.audioDuration || '0:48'}
                            </Text>
                          </View>
                        </View>

                        {mem.quote && (
                          <View style={styles.transcriptBox}>
                            <Text style={styles.transcriptLabel}>TRANSCRIPT EXCERPT</Text>
                            <Text style={styles.transcriptText}>{mem.quote}</Text>
                          </View>
                        )}
                      </View>
                    )}

                    {/* Thought Memory */}
                    {mem.type === 'thought' && (
                      <View style={styles.thoughtBlock}>
                        <Text style={styles.thoughtQuote}>{mem.quote}</Text>

                        <View style={styles.thoughtFooterRow}>
                          <TouchableOpacity
                            onPress={() => onOpenMemoryDetail(mem)}
                            style={styles.reflectionBtn}
                          >
                            <Text style={styles.reflectionBtnText}>Resurface inquiry →</Text>
                          </TouchableOpacity>

                          <View style={styles.thoughtIcons}>
                            <TouchableOpacity onPress={() => toggleFavorite(mem.id)}>
                              <ToMeIcon
                                name={favorites[mem.id] ? 'favorite' : 'favorite_border'}
                                size={18}
                                color={favorites[mem.id] ? COLORS.secondary : COLORS.outline}
                              />
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <ToMeIcon name="share" size={18} color={COLORS.outline} />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>
                </React.Fragment>
              ))}
            </View>
          )}

          {/* August 2026 Section */}
          {augMemories.length > 0 && (
            <View style={styles.monthSection}>
              <View style={styles.monthHeaderRow}>
                <Text style={styles.monthTitle}>August 2026</Text>
                <View style={styles.monthCountBadge}>
                  <Text style={styles.monthCountText}>{augMemories.length} entries</Text>
                </View>
              </View>

              {augMemories.map((mem) => (
                <React.Fragment key={mem.id}>
                  <View style={styles.memoryCard}>
                    <View style={styles.cardMetaRow}>
                      <Text style={styles.metaTag}>{mem.tag || 'MEMORY'}</Text>
                      <Text style={styles.metaDate}>{mem.dateLabel}</Text>
                    </View>

                    <Text style={styles.thoughtQuote}>{mem.quote}</Text>

                    <View style={styles.thoughtFooterRow}>
                      <TouchableOpacity
                        onPress={() => onOpenMemoryDetail(mem)}
                        style={styles.reflectionBtn}
                      >
                        <Text style={styles.reflectionBtnText}>Resurface inquiry →</Text>
                      </TouchableOpacity>

                      <View style={styles.thoughtIcons}>
                        <TouchableOpacity onPress={() => toggleFavorite(mem.id)}>
                          <ToMeIcon
                            name={favorites[mem.id] ? 'favorite' : 'favorite_border'}
                            size={18}
                            color={favorites[mem.id] ? COLORS.secondary : COLORS.outline}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <ToMeIcon name="share" size={18} color={COLORS.outline} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              ))}
            </View>
          )}
        </View>

        {/* Peaceful Footer */}
        <View style={styles.footer}>
          <ToMeIcon name="spa" size={18} color={COLORS.outline} />
          <Text style={styles.footerText}>
            Your garden of memories is growing quietly.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  scrollContent: {
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.xs,
    paddingBottom: 90,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.full,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.8)',
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: COLORS.onSurface,
  },
  searchTuneBtn: {
    padding: 4,
  },
  filterScroll: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: SPACING.md,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.8)',
  },
  filterPillActive: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  filterText: {
    fontSize: 12,
    color: COLORS.onSurfaceVariant,
    fontWeight: '500',
  },
  filterTextActive: {
    color: COLORS.onSecondary,
  },
  timelineContainer: {
    gap: SPACING.lg,
  },
  monthSection: {
    gap: SPACING.sm,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  monthTitle: {
    fontSize: 18,
    fontFamily: 'Literata',
    fontWeight: '600',
    color: COLORS.onSurface,
  },
  monthCountBadge: {
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  monthCountText: {
    fontSize: 11,
    color: COLORS.onSurfaceVariant,
  },
  memoryCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(229, 226, 220, 0.7)',
    shadowColor: '#463228',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaTag: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.secondary,
    textTransform: 'uppercase',
  },
  metaDate: {
    fontSize: 11,
    color: COLORS.outline,
  },
  photoBlock: {
    gap: 8,
  },
  photoContainer: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    position: 'relative',
    height: 180,
  },
  memoryPhoto: {
    width: '100%',
    height: '100%',
  },
  analogBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(10, 7, 6, 0.65)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  analogBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: COLORS.onPrimary,
  },
  photoQuoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.onSurface,
  },
  viewConversationLink: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  linkText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  voiceBlock: {
    gap: 8,
  },
  voiceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceContainerLow,
    padding: 10,
    borderRadius: RADIUS.lg,
    gap: 10,
  },
  voicePlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceWaveformContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  waveformBars: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  waveformBar: {
    width: 3,
    backgroundColor: COLORS.outlineVariant,
    borderRadius: 1.5,
  },
  barActive: {
    backgroundColor: COLORS.secondary,
  },
  audioDurationText: {
    fontSize: 11,
    color: COLORS.outline,
  },
  transcriptBox: {
    backgroundColor: COLORS.surfaceContainerLow,
    padding: 10,
    borderRadius: RADIUS.md,
    gap: 4,
  },
  transcriptLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: COLORS.outline,
  },
  transcriptText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: COLORS.onSurface,
  },
  thoughtBlock: {
    gap: 10,
  },
  thoughtQuote: {
    fontSize: 16,
    fontFamily: 'Literata',
    fontStyle: 'italic',
    color: COLORS.onSurface,
    lineHeight: 24,
  },
  thoughtFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  reflectionBtn: {
    backgroundColor: COLORS.surfaceContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
  },
  reflectionBtnText: {
    fontSize: 12,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  thoughtIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: 4,
  },
  footerText: {
    fontSize: 13,
    color: COLORS.outline,
    fontFamily: 'Literata',
    fontStyle: 'italic',
  },
});
